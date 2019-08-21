class Http {
  status(response) {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    } else if (response.status == 404) {
      throw 'Api not found';
    }
    throw response;
  };

  jsonResult(errno, data, message) {
    let result = {
      errno: errno,
      data: data ? data : null,
      message: message ? message : null
    };

    result.errno = errno;
    result.data = data;
    result.message = message;

    return result;
  };
}
module.exports = new Http();