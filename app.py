import uvicorn
import os
import threading
import requests
import time
from dotenv import load_dotenv
from supabase import create_client, Client
from fastapi import FastAPI, Request, Form, File, UploadFile
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    # define the allowed origins explicitly, currently this wildcard is NOT recommended
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
load_dotenv()
supabase_url = os.environ.get("SUPABASE_URL")
supabase_key = os.environ.get("SUPABASE_KEY")
supabase_bucket_name = os.environ.get("SUPABASE_BUCKET_NAME")
supabase: Client = create_client(supabase_url, supabase_key)

# Supabase Storage here
buckets = supabase.storage.list_buckets()
print(buckets)


templates = Jinja2Templates(directory="src/templates")
app.mount("/static", StaticFiles(directory="src/static"), name="static")


def upload_to_supabase(file_name, file_data):
    # Include the "uploads" folder in the destination path
    supabase_destination_folder = f"{file_name}"
    res = supabase.storage.from_(
        supabase_bucket_name).upload(supabase_destination_folder, file_data)
    return res


def queue_delete_old_files():
    # Get all files in the storage bucket
    all_files = supabase.storage.from_(supabase_bucket_name).list()
    file_paths_names = []
    # Get the file names and delete them
    for file in all_files:
        file_paths_names.append(file["name"])

    # Check if there are more than 0 files in the bucket
    if len(file_paths_names) > 0:
        res = supabase.storage.from_(
            supabase_bucket_name).remove(file_paths_names)


def periodic_check():
    # Set the interval in seconds (5 minutes = 300 seconds)
    interval = 300

    while True:
        # Call the function to delete old files
        queue_delete_old_files()

        # Wait for the specified interval before checking again
        time.sleep(interval)


# Create a thread that periodically checks for new files in the storage bucket every 5 minutes
thread = threading.Thread(target=periodic_check)
# Daemonize the thread to allow the program to exit even if the thread is running
thread.daemon = True
thread.start()


@app.get("/", response_class=HTMLResponse)
def index(request: Request):
    # queue_delete_old_files()
    return templates.TemplateResponse("index.html", {"request": request})


@app.post("/", response_class=HTMLResponse)
async def index(request: Request, file_upload: UploadFile = File(None)):
    # file_upload here
    if file_upload is not None:
        content = await file_upload.read()
        upload_to_supabase(file_upload.filename, content)
        print(f"File '{file_upload.filename}' uploaded to Supabase!")
    else:
        return "No input data provided"


# if __name__ == "__main__":
#     uvicorn.run('app:app', host="localhost", port=5002, reload=True)
