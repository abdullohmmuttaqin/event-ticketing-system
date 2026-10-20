// Pengujian Otomatis (Unit Test) Logika Tiket

const { hitungTotalHarga, cekKetersediaanKuota, prosesPemesanan } = require('./ticketService');

describe('Unit Testing Modul Tiket Event', () => {
  
  // Test 1: Kalkulasi harga normal tanpa diskon
  test('TC-01: Menghitung total harga tiket tanpa diskon', () => {
    const result = hitungTotalHarga(2, 50000, 0);
    expect(result).toBe(100000);
  });

  // Test 2: Kalkulasi harga dengan diskon 10%
  test('TC-02: Menghitung total harga tiket dengan diskon 10%', () => {
    const result = hitungTotalHarga(2, 100000, 10);
    expect(result).toBe(180000);
  });

  // Test 3: Pengecekan kuota cukup
  test('TC-03: Kuota tersedia jika jumlah dipesan lebih kecil dari sisa kuota', () => {
    const result = cekKetersediaanKuota(10, 3);
    expect(result).toBe(true);
  });

  // Test 4: Pengecekan kuota habis/kurang
  test('TC-04: Kuota tidak tersedia jika jumlah dipesan melebihi sisa kuota', () => {
    const result = cekKetersediaanKuota(2, 5);
    expect(result).toBe(false);
  });

  // Test 5: Proses pemesanan sukses & potong kuota
  test('TC-05: Memproses pemesanan berhasil dan memotong kuota', () => {
    const result = prosesPemesanan(10, 2, 50000, 0);
    expect(result.sukses).toBe(true);
    expect(result.sisaKuotaBaru).toBe(8);
    expect(result.totalBayar).toBe(100000);
  });

});