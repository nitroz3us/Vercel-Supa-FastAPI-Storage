# Vercel-Supa-FastAPI-Storage

This repository contains a web application that provides a secure file upload functionality. The application is hosted on Vercel, utilizes Supabase for storage, and leverages FastAPI for RESTful API functionalities. With this application, users can easily upload files and store them securely in the cloud.

## Key Features

- Upload files to Supabase storage using FastAPI.
- Periodically delete old files in the storage bucket to manage storage space.
- Web interface to interact with the file upload functionality.

## Getting Started (Locally)

To get started with the Vercel-Supa-FastAPI-Storage, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/nitroz3us/Vercel-Supa-FastAPI-Storage.git
   ```

2. Install the required dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Set up your environment variables:

   - Create a .env file in the project root directory.
   - Add the following environment variables to the .env file:

     ```makefile
     SUPABASE_URL=<your_supabase_url>
     SUPABASE_KEY=<your_supabase_key>
     SUPABASE_BUCKET_NAME=<your_supabase_bucket_name>
     ```

4. Run the application:

   ```bash
   python app.py
   ```

5. Access the web interface in your browser at http://localhost:5002.

## Usage

- Access the web interface in your browser.
- Drag and Drop your file or click to select your file.
- Click the "Go" button to upload the selected file to Supabase storage.
- The uploaded files will be managed and periodically checked for deletion to optimize storage space.

## Demo

## Why am I doing this?

- Wanted to try hosting on Vercel and using Supabase for Storage system.

## Technologies Used

- FastAPI
- Vercel
- Supabase
- TailwindCSS

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

The Vercel-Supa-FastAPI-Storage provides an easy-to-use solution for uploading files to Supabase storage, ensuring secure and efficient management of uploaded files.
