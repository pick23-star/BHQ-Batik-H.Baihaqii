function toggleMenu() {
  const nav = document.getElementById("nav");
  nav.style.display = nav.style.display === "block" ? "none" : "block";
}

// Fade out saat pindah halaman
document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const href = link.getAttribute("href");
    document.body.style.opacity = 0;
    setTimeout(() => {
      window.location.href = href;
    }, 300);
  });
});

// ================== DATA KERANJANG ==================
let keranjang = [];

// ================== TAMBAH PRODUK ==================
function tambahKeranjang(nama, harga) {
  keranjang.push({ nama, harga });
  tampilkanKeranjang();
}

// ================== HAPUS ==================
function hapusItem(index) {
  keranjang.splice(index, 1);
  tampilkanKeranjang();
}

// ================== TOGGLE CART ==================
function toggleCart() {
  document.getElementById("cart-panel").classList.toggle("active");
}

// ================== TAMPILKAN KERANJANG ==================
function tampilkanKeranjang() {
  let list = document.getElementById("list-keranjang");
  let count = document.getElementById("cart-count");
  let totalEl = document.getElementById("total-harga");

  if (!list) return;

  list.innerHTML = "";
  count.innerText = keranjang.length;

  let total = 0;

  keranjang.forEach((item, index) => {
    let hargaAngka = parseInt(item.harga.replace(/[^0-9]/g, ""));
    total += hargaAngka;

    let li = document.createElement("li");
    li.innerHTML = `
      <span>${item.nama} - ${item.harga}</span>
      <button onclick="hapusItem(${index})">❌</button>
    `;
    list.appendChild(li);
  });

  if (totalEl) {
    totalEl.innerText = "Total: Rp " + total.toLocaleString();
  }
}

// ================== KIRIM WA ==================
function kirimWA() {
  if (keranjang.length === 0) {
    alert("Keranjang kosong!");
    return;
  }

  let nama = document.getElementById("nama").value.trim();
  let alamat = document.getElementById("alamat").value.trim();
  let catatan = document.getElementById("catatan").value.trim();

  // ✅ VALIDASI
  if (!nama || !alamat) {
    alert("Nama dan Alamat wajib diisi!");
    return;
  }

  let pesan = "Halo admin BHQ Batik,%0A";
  pesan += "Saya ingin memesan:%0A%0A";

  let total = 0;

  keranjang.forEach((item, i) => {
    pesan += `${i + 1}. ${item.nama} (${item.harga})%0A`;
    total += parseInt(item.harga.replace(/[^0-9]/g, ""));
  });

  pesan += `%0ATotal: Rp ${total.toLocaleString()}%0A%0A`;
  pesan += `Nama: ${nama}%0A`;
  pesan += `Alamat: ${alamat}%0A`;

  if (catatan) {
    pesan += `Catatan: ${catatan}%0A`;
  }

  pesan += "%0ATerima kasih.";

  window.open(`https://wa.me/6285975988180?text=${pesan}`, "_blank");
}

let produkDipilih = {};

// buka modal
function bukaModal(nama, img, harga50, harga100) {
  document.getElementById("modal-produk").style.display = "block";

  document.getElementById("modal-nama").innerText = nama;
  document.getElementById("modal-img").src = img;
  document.getElementById("harga50").innerText = harga50;
  document.getElementById("harga100").innerText = harga100;

  produkDipilih = { nama, harga50, harga100 };
}

// tutup modal
function tutupModal() {
  document.getElementById("modal-produk").style.display = "none";
}

// kirim WA dari modal
function pesanProduk() {
  let pesan = `Halo admin BHQ Batik,%0A`;
  pesan += `Saya ingin membeli:%0A`;
  pesan += `${produkDipilih.nama}%0A`;
  pesan += `Harga 50cm: ${produkDipilih.harga50}%0A`;
  pesan += `Harga 100cm: ${produkDipilih.harga100}%0A`;

  window.open(`https://wa.me/6285975988180?text=${pesan}`, "_blank");
}

function tambahKeranjang(nama, harga) {
  keranjang.push({ nama, harga });
  tampilkanKeranjang();

  // animasi badge
  let count = document.getElementById("cart-count");
  count.classList.add("bounce");

  setTimeout(() => {
    count.classList.remove("bounce");
  }, 300);
}

let ukuranDipilih = null;
let harga50 = 0;
let harga100 = 0;
let qty = 1;
let namaProduk = "";

/* buka modal */
function bukaModal(nama, img, h50, h100) {
  document.getElementById("modal-produk").style.display = "block";
  document.getElementById("modal-img").src = img;
  document.getElementById("modal-nama").innerText = nama;

  harga50 = parseInt(h50.replace(/\D/g, ""));
  harga100 = parseInt(h100.replace(/\D/g, ""));

  namaProduk = nama;
  qty = 1;
  document.getElementById("qty").innerText = qty;
  document.getElementById("harga-terpilih").innerText = "Pilih ukuran dulu";

  ukuranDipilih = null;
}

/* pilih ukuran */
function pilihUkuran(u) {
  ukuranDipilih = u;

  document.getElementById("btn50").classList.remove("active");
  document.getElementById("btn100").classList.remove("active");

  if (u === 50) {
    document.getElementById("btn50").classList.add("active");
    document.getElementById("harga-terpilih").innerText = "Rp " + harga50.toLocaleString();
  } else {
    document.getElementById("btn100").classList.add("active");
    document.getElementById("harga-terpilih").innerText = "Rp " + harga100.toLocaleString();
  }
}

/* qty */
function tambahQty() {
  qty++;
  document.getElementById("qty").innerText = qty;
}

function kurangQty() {
  if (qty > 1) qty--;
  document.getElementById("qty").innerText = qty;
}

/* masuk keranjang */
function tambahDariModal() {
  if (!ukuranDipilih) {
    alert("Pilih ukuran dulu!");
    return;
  }

  let harga = ukuranDipilih === 50 ? harga50 : harga100;
  let total = harga * qty;

  tambahKeranjang(
    `${namaProduk} (${ukuranDipilih}cm x${qty})`,
    "Rp " + total.toLocaleString()
  );

  tutupModal();
}