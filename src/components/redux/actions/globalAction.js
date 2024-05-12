export const EditData = (dataList, id, data) => {
  const newData = dataList.map((item) => (item._id === id ? data : item));
  return newData;
};

export const DeleteData = (dataList, id) => {
  const newData = dataList.filter((data) => data._id !== id);
  return newData;
};

export const GLOBAL_TYPES = {
  LOADING: "LOADING",
  SOCKET: "SOCKET",
  ONLINE: "ONLINE",
  OFFLINE: "OFFLINE",
  MODAL: "MODAL",
  ERROR: "ERROR",
  AUTH: "AUTH",
};
