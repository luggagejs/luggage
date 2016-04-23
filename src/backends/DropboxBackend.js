import { download, putFile } from "dropbox-client";

class DropboxCollection {
  constructor(name, backend) {
    this.name = name;
    this.token = backend.token;
  }

  get fileName() {
    return `${this.name}.json`;
  }

  get filePath() {
    return `/${this.fileName}`;
  }

  read() {
    return download(this.token, { path: this.filePath })

    .then(data => {
      let partialContent = "";
      const decoder = new TextDecoder();
      const reader = data.content.getReader();

      const read = () => {
        return reader.read().then(result => {
          if (!result.done) {
            partialContent += decoder.decode(result.value, {
              stream: true
            });

            return read();
          } else {
            return JSON.parse(partialContent);
          }
        });
      };

      return read();
    })

    .then(data => {
      if (data.error) {
        switch(data.error[".tag"]) {
          case "path":
            return [];
          default:
            throw data.error;
        }
      } else {
        return data;
      }
    });
  }

  write(data=[]) {
    return putFile(
      this.token,
      JSON.stringify(data),
      "text/plain; charset=dropbox-cors-hack",
      {path: this.filePath}
    ).then(() => data);
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
