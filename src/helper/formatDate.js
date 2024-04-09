export function formatDate(inputDate) {
    if (!inputDate) return '';
    // Tách các thành phần của ngày tháng từ chuỗi đầu vào
    const parts = inputDate.split('T')[0].split('-');
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    // Tạo định dạng mới 'DD/MM/YYYY'
    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
}
