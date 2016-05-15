const downloadApiPath = "https://content.dropboxapi.com/2/files/download";
const uploadApiPath = "https://content.dropboxapi.com/2/files/upload";

class DropboxCollection {
  constructor(name, backend) {
    this.name = name;
    this.token = backend.token;
  }

  get fileName() {
    return `${this.name}.json`;
  }

  read() {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();

      request.onload = () => {
        const data = JSON.parse(request.responseText);

        if (data.error) {
          if (data.error[".tag"] === "path") {
            resolve([]);
          } else {
            reject(data.error);
          }
        } else {
          resolve(data);
        }
      };

      request.ontimeout = () => {
        reject(request.responseText);
      };
      request.onerror = () => {
        reject(request.responseText);
      };
      request.open("POST", downloadApiPath);
      request.setRequestHeader("Authorization", `Bearer ${this.token}`);
      request.setRequestHeader("Dropbox-API-Arg", JSON.stringify({ path: "/"+this.fileName }));
      request.send();
    });
  }

  write(data=[]) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();

      request.onload = () => {
        const response = request.responseText;
        if (response.error) {
          reject(response.error);
        } else {
          resolve(data);
        }
      };

      request.ontimeout = () => {
        reject(request.responseText);
      };
      request.onerror = () => {
        reject(request.responseText);
      };
      request.open("POST", uploadApiPath);
      request.setRequestHeader("Authorization", `Bearer ${this.token}`);
      request.setRequestHeader("Dropbox-API-Arg", JSON.stringify({ path: "/"+this.fileName }));
      request.setRequestHeader("Content-Type", "text/plain; charset=dropbox-cors-hack");
      request.send(JSON.stringify(data));
    });
  }
}

class DropboxBackend {
  constructor(token) {
    this.token = token;
  }

  collection(name) {
    return new DropboxCollection(name, this);
  }
}

export default DropboxBackend;
