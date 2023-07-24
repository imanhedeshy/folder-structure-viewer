# File Structure Viewer

File Structure Viewer is a simple tool built using Node.js and vanilla JavaScript that allows users to input a directory path, either by typing it directly into an input field or by using a 'Browse Folder' button. It displays the directory structure as a hierarchical view and also provides the ability to download this structure as an Excel file.

The directory structure is also shown in a HTML table within the webpage. This tool employs Express.js for server-side operations and uses the xlsx library to generate the Excel spreadsheet.

## Table of Contents

- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

## Getting Started

This section will guide you through setting up a local instance of the project.

### Prerequisites

Ensure you have Node.js and npm installed. If not, you can download Node.js and npm from [here](https://nodejs.org/). The npm will be installed with Node.js

### Installation

1. Clone this repository:
    ```
    git clone https://github.com/imanhedeshy/file-structure-viewer.git
    ```
2. Navigate to the project directory:
    ```
    cd file-structure-viewer
    ```
3. Install the required dependencies:
    ```
    npm install
    ```

## Usage

1. Start the server by running the command:
    ```
    node server.js
    ```
2. Open `http://localhost:3000` in your web browser.
3. Enter the path of the directory in the input box or click the 'Browse Folder' button to select a directory. The directory structure will be displayed on the screen.
4. Click the 'Download Folder Structure as Excel' button to download the directory structure as an Excel spreadsheet. This will also render the spreadsheet on the webpage.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a pull request.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Iman Hedeshy - iman@hedeshy.ca

Project Link: https://github.com/imanhedeshy/file-structure-viewer

## Acknowledgements

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [xlsx](https://www.npmjs.com/package/xlsx)

This project is a demonstration of how to display a directory structure in a web browser. The code is not production-ready and is intended for educational purposes only.
