import Dropbox from "dropbox";
import { binaryToJson, handleDropboxError, genericBackend } from "./utils";

class DropboxCollection {
  constructor(name, backend) {
    this.name = name;
    this.client = new Dropbox({
      token: backend.token
    });
  }

  get filePath() {
    return `/${this.name}.json`;
  }

  read() {
    return this.client.filesDownload({ path: this.filePath })
      .then(binaryToJson)
      .then(handleDropboxError);
  }

  write(data=[]) {
    this.client.filesUpload({
      contents: JSON.stringify(data),
      path: this.filePath
    }).then(() => data);
  }
}

export default genericBackend(DropboxCollection);
