export let headers = () => {
    return { "Content-Type": "application/json", "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYzkxNzZhYjg0OGY0MmY0ODkwNTJiMSIsIm5hbWUiOiJHb2t1bCIsImlhdCI6MTU5MDU4OTg0MiwiZXhwIjoxNTkwNTkzNDQyfQ.KrYsibwkFIQliRsuwQKHJCZklcbxuQw8XfY1_W_lLyE` };
}

export function handleResponse(response) {
    return response.text().then((text) => {
        let data = ""
        try {
            data = text && JSON.parse(text);
        } catch (e) {
            data = text;
        }
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // window.location.href = "/login";
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}
