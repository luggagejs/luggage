import Dropbox from "dropbox";
import { binaryToJson, handleDropboxError, genericBackend } from "./utils";

class DropboxCollection {
  constructor(name, backend) {
    this.name = name;
    this.client = new Dropbox({
      accessToken: backend.token
    });
  }

  get filePath() {
    return `/${this.name}.json`;
  }

  read() {
    return this.client
      .filesDownload({ path: this.filePath })
      .then(binaryToJson)
      .catch(handleDropboxError);
  }

  write(data=[]) {
    return this.client.filesUpload({
      contents: JSON.stringify(data),
      path: this.filePath,
      mode: "overwrite"
    }).then(() => data);
  }
}

export default genericBackend(DropboxCollection);
