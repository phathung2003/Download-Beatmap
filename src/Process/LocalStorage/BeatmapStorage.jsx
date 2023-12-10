const key = 'beatmapData';

//Đặt dữ liệu
export function setBeatmapStorage(data) {
  const jsonData = JSON.stringify(data);   // Chuyển đổi đối tượng JSON thành chuỗi
  localStorage.setItem(key, jsonData);   // Lưu chuỗi JSON vào local storage với key cho trước
}

//Lấy dữ liệu
export function getBeatmapStorage() {
  const storeData = localStorage.getItem(key);  // Lấy dữ liệu từ Local Storage
  const JSONFile = JSON.parse(storeData); // Chuyển đổi chuỗi JSON thành đối tượng JSON
  return JSONFile;
}

//Xóa Local Storage nhất định
export function deleteBeatmapStorage() { localStorage.removeItem(key); }

//Xóa toàn bộ Local Storage
export function deleteAllLocalStorage() { localStorage.clear(); }