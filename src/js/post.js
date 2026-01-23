import { Header } from "../layout/header/Header.js";
import { Footer } from "../layout/footer/Footer.js";
import "../../env.js";
Header();
Footer();

const thumbnailInput = document.querySelector("#thumbnail");
const preview = document.querySelector("#preview");
const btnSave = document.querySelector("#saveBtn");

let previewUrl = "";
const removePreview = () => {
  URL.revokeObjectURL(previewUrl);
  preview.innerHTML = "";
};

thumbnailInput.addEventListener("change", () => {
  const file = thumbnailInput.files[0];
  preview.innerHTML = "";
  if (!file) return;
  if (!/^(image|video)\//.test(file.type)) {
    alert("Chỉ được upload ảnh hoặc video");
    return;
  }
  if (previewUrl) {
    URL.revokeObjectURL(previewUrl);
  }

  previewUrl = URL.createObjectURL(file);

  preview.innerHTML = `<div class="position-relative w-25">
        <img class="w-100" src="${previewUrl}" alt="preview">
        <button type="button" id="removeBtn" class="btn position-absolute end-0 rounded-10 bg-secondary text-white">x</button>
    </div>`;

  document.querySelector("#removeBtn").addEventListener("click", () => {
    removePreview();
    thumbnailInput.value = "";
  });
});

async function uploadThumbnail(file) {
  const formData = new FormData();
  const type = file.type.includes("image") ? "image" : "video";
  formData.append("file", file);
  formData.append("upload_preset", window.ENV.UPLOAD_PRESET);
  formData.append("folder", "thumbnails");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${window.ENV.CLOUD_NAME}/${type}/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message);

  return data.secure_url;
}

btnSave.addEventListener("click", async (e) => {
  e.preventDefault();

  try {
    const file = thumbnailInput.files[0];
    const url = await uploadThumbnail(file);
    const title = document.getElementById("title").value;
    const desc = document.getElementById("description").value;
    const director = document.getElementById("director").value;

    console.log({
      title: title,
      desc: desc,
      thumbnail: url,
      director: director,
    });
  } catch (err) {
    console.error("Lỗi trong quá trình đăng:", err);
  }
});
