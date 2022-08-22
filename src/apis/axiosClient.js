import axios from "axios";

// set cấu hình mặc định cho axios
const axiosClient = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn/api/",
  headers: {
    TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAyNyIsIkhldEhhblN0cmluZyI6IjIxLzAxLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY3NDI1OTIwMDAwMCIsIm5iZiI6MTY0NjE1NDAwMCwiZXhwIjoxNjc0NDA2ODAwfQ.5JfRY7XxLBvxphVDGE6br_uBYC9AbkqaSEmNTGvzWtQ",
  },
});

// // interceptors
// axiosClient.interceptors.response.use(
//     // thành công
//     (response) => {
//       // Ta có thể thay đổi response trước khi response được trả ra cho nơi gọi request.
//       // response.data: format của axios
//       // .content: format của cybersoft
//       return response.data.content;
//     },
//     // thất bại
//     (error: AxiosError) => {
//       // Ta có thể thay đổi error trước khi error được trả ra cho nơi gọi request.
//       Promise.reject((error.response?.data as any).content);
//     }
//   );

export default axiosClient;
