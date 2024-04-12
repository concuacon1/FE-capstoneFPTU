export function formatDate(inputDate) {
    if (!inputDate) return '';
    // Chuyển đổi chuỗi đầu vào thành đối tượng Date
    const date = new Date(inputDate);

    // Tách các thành phần của ngày tháng
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Lưu ý: getMonth() trả về 0-11
    const year = date.getFullYear();

    // Tạo định dạng mới 'DD/MM/YYYY'
    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
}
