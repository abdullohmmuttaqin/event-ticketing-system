// Modul Logika Bisnis Pemesanan Tiket Event

/**
 * 1. Menghitung Total Harga Tiket (ditambah diskon jika ada)
 * @param {number} jumlahTiket - Jumlah tiket yang dibeli
 * @param {number} hargaPerTiket - Harga satuan tiket
 * @param {number} persenDiskon - Persentase diskon (misal: 10 untuk 10%)
 * @returns {number} Total harga akhir setelah diskon
 */
function hitungTotalHarga(jumlahTiket, hargaPerTiket, persenDiskon = 0) {
  // Validasi input tidak boleh bernilai negatif atau nol
  if (jumlahTiket <= 0 || hargaPerTiket <= 0) {
    return 0;
  }

  const subtotal = jumlahTiket * hargaPerTiket;
  const nominalDiskon = (subtotal * persenDiskon) / 100;
  
  return subtotal - nominalDiskon;
}

/**
 * 2. Mengecek Ketersediaan Kuota Tiket
 * @param {number} sisaKuota - Jumlah kuota yang masih tersedia di sistem
 * @param {number} jumlahDipesan - Jumlah tiket yang ingin dipesan pengguna
 * @returns {boolean} true jika kuota cukup, false jika kuota tidak mencukupi
 */
function cekKetersediaanKuota(sisaKuota, jumlahDipesan) {
  if (jumlahDipesan <= 0) return false;
  return sisaKuota >= jumlahDipesan;
}

/**
 * 3. Memproses Pemesanan Tiket & Pemotongan Kuota Otomatis
 * @param {number} sisaKuota - Kuota awal saat ini
 * @param {number} jumlahDipesan - Tiket yang mau dibeli
 * @param {number} hargaPerTiket - Harga satuan tiket
 * @param {number} persenDiskon - Persentase diskon
 * @returns {object} Status transaksi, pesan, sisa kuota baru, dan total harga
 */
function prosesPemesanan(sisaKuota, jumlahDipesan, hargaPerTiket, persenDiskon = 0) {
  // Alur 1: Cek dulu ketersediaan kuota
  const kuotaCukup = cekKetersediaanKuota(sisaKuota, jumlahDipesan);

  if (!kuotaCukup) {
    return {
      sukses: false,
      pesan: "Pemesanan gagal: Kuota tiket tidak mencukupi!",
      sisaKuotaBaru: sisaKuota,
      totalBayar: 0
    };
  }

  // Alur 2: Hitung total bayar jika kuota tersedia
  const totalBayar = hitungTotalHarga(jumlahDipesan, hargaPerTiket, persenDiskon);
  const sisaKuotaBaru = sisaKuota - jumlahDipesan;

  return {
    sukses: true,
    pesan: "Pemesanan berhasil diproses!",
    sisaKuotaBaru: sisaKuotaBaru,
    totalBayar: totalBayar
  };
}

// Export fungsi-fungsi agar dapat diuji oleh Jest (Unit Test)
module.exports = {
  hitungTotalHarga,
  cekKetersediaanKuota,
  prosesPemesanan
};