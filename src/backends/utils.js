export const binaryToJson = data => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = e => {
      resolve(JSON.parse(e.target.result));
    };

    reader.readAsText(data.fileBlob);
  });
};


export const handleDropboxError = data => {
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
};


export const genericBackend = Collection => {
  class DropboxBackend {
    constructor(token) {
      this.token = token;
    }

    collection(name) {
      return new Collection(name, this);
    }
  }

  return DropboxBackend;
};
