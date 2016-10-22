export const binaryToJson = data => {
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
