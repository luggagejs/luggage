import { download, putFile } from "dropbox-client";
import { binaryToJson, handleDropboxError, genericBackend } from "./utils";

class DropboxCollection {
  constructor(name, backend) {
    this.name = name;
    this.token = backend.token;
  }

  get filePath() {
    return `/${this.name}.json`;
  }

  read() {
    return download(this.token, { path: this.filePath })
      .then(binaryToJson)
      .then(handleDropboxError);
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

export default genericBackend(DropboxCollection);
