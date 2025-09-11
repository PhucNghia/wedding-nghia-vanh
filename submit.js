// document.addEventListener('DOMContentLoaded', function() {
//     const form = document.getElementById('4qa66ho3'); // Lấy form bằng ID
//     const submitButtonDiv = document.getElementById('w-g5roin98'); // Lấy div chứa nút GỬI NGAY
//     const submitButtonText = submitButtonDiv.querySelector('.button-text span'); // Lấy span chứa chữ GỬI NGAY

//     form.addEventListener('submit', function(event) {
//         event.preventDefault(); // Ngăn chặn hành vi gửi form mặc định

//         submitButtonText.textContent = 'ĐANG GỬI...'; // Thay đổi trạng thái nút
//         submitButtonDiv.classList.add('loading'); // Thêm class để hiển thị loader (nếu có CSS cho nó)

//         const formData = new FormData(form);
//         const data = {};
//         formData.forEach((value, key) => {
//             // Xử lý các checkbox: nếu cùng tên, lưu thành mảng hoặc chuỗi
//             if (key in data) {
//                 if (!Array.isArray(data[key])) {
//                     data[key] = [data[key]];
//                 }
//                 data[key].push(value);
//             } else {
//                 data[key] = value;
//             }
//         });

//         // Đặc biệt xử lý các checkbox không được chọn:
//         // Formdata chỉ bao gồm các input có giá trị. Checkbox không được chọn sẽ không có trong formdata.
//         // Cần liệt kê tất cả các tên checkbox và kiểm tra.
//         const allCheckboxes = form.querySelectorAll('input[type="checkbox"]');
//         allCheckboxes.forEach(checkbox => {
//             if (!formData.has(checkbox.name)) {
//                 data[checkbox.name] = "Không chọn"; // Hoặc "false", null tùy bạn
//             }
//         });

//         // Thay thế 'YOUR_API_GATEWAY_ENDPOINT' bằng URL bạn sẽ nhận được từ API Gateway sau này
//         fetch('YOUR_API_GATEWAY_ENDPOINT', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(data),
//         })
//         .then(response => {
//             if (!response.ok) {
//                 return response.json().then(err => { throw new Error(err.message || 'Lỗi mạng hoặc server không phản hồi tốt.') });
//             }
//             return response.json();
//         })
//         .then(result => {
//             console.log('Success:', result);
//             alert('Cảm ơn bạn! Thông tin đã được gửi thành công.');
//             form.reset(); // Reset form sau khi gửi thành công
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             alert('Đã có lỗi xảy ra khi gửi thông tin. Vui lòng thử lại. Lỗi: ' + error.message);
//         })
//         .finally(() => {
//             submitButtonText.textContent = 'GỬI NGAY'; // Khôi phục trạng thái nút
//             submitButtonDiv.classList.remove('loading');
//         });
//     });
// });