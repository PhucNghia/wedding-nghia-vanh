document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('4qa66ho3'); // Lấy form bằng ID của bạn
    const submitButtonDiv = document.getElementById('w-g5roin98'); // Lấy div chứa nút GỬI NGAY
    const submitButtonText = submitButtonDiv.querySelector('.button-text span'); // Lấy span chứa chữ GỬI NGAY

    // Lưu trữ hàm saveData gốc nếu nó tồn tại để gọi sau nếu cần
    // Hoặc ghi đè nó hoàn toàn nếu bạn muốn kiểm soát việc gửi dữ liệu
    const originalSaveData = window.h && window.h.saveData ? window.h.saveData : null;

    form.addEventListener('submit', async function(event) {

        event.preventDefault(); // Rất quan trọng: Ngăn chặn form gửi dữ liệu theo cách mặc định
        // submitButtonText.textContent = 'ĐANG GỬI...';
        submitButtonDiv.classList.add('loading'); // Thêm class để hiển thị loader

        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            // Xử lý các trường input đã có trong form
            if (key in data) {
                if (!Array.isArray(data[key])) {
                    data[key] = [data[key]];
                }
                data[key].push(value);
            } else {
                data[key] = value;
            }
        });

        // Xử lý các checkbox không được chọn để gửi giá trị "Không chọn"
        const allCheckboxes = form.querySelectorAll('input[type="checkbox"]');
        allCheckboxes.forEach(checkbox => {
            if (!formData.has(checkbox.name)) {
                data[checkbox.name] = "Không chọn";
            }
        });

        // =================================================================
        // THAY THẾ 'YOUR_API_GATEWAY_ENDPOINT' bằng URL API Gateway của bạn
        // =================================================================
        const apiGatewayEndpoint = 'YOUR_API_GATEWAY_ENDPOINT';
        url = "https://script.google.com/macros/s/AKfycbysh3qKMYmM7fYmaYsD2eBdhYFEpTIj9U9-FwJN4ST9T1kk8FtLksIL5Z39Xdmvdssv/exec"

        try {
            fetch(url, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
              mode: "no-cors"
            });

            if(data['full_name'] != "") {
              alert('Cảm ơn bạn! Thông tin đã được gửi thành công.');
              form.reset();
            }

        } catch (error) {
            console.error('Error:', error);
            alert('Đã có lỗi xảy ra khi gửi thông tin. Vui lòng thử lại. Lỗi: ' + error.message);
        } finally {
            submitButtonDiv.classList.remove('loading');
            // submitButtonText.textContent = 'GỬI NGAY';
        }
    });

    // Cần thêm một sự kiện click cho cái div cha 'w-g5roin98'
    // vì code gốc gán listener cho 'this.vm.$el' mà có thể là div này
    // hoặc một element bao quanh.
    // Nếu bạn muốn giữ lại hành vi gốc của WebcakeScript mà không bị trùng lặp,
    // hãy đảm bảo rằng `event.preventDefault()` của bạn được gọi trước khi
    // bất kỳ hành vi gửi nào khác (bao gồm cả `window.h.saveData()`) được kích hoạt.
    // Event listener cho form.submit() sẽ chạy trước các event click trên nút.
});