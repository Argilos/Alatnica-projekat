export interface Tool {
  alat_id: string;            // Updated to match 'alat_id' in ALAT table
  bar_kod?: string;           // Corresponds to 'bar_kod' in ALAT table
  ets_id?: string;            // Corresponds to 'ets_id' in ALAT table
  naziv: string;              // Updated to match 'naziv' in ALAT table
  datum_ulaza?: string | null; // Updated to match 'datum_ulaza' in ALAT table
  id_model: string;           // Updated to match 'id_model' in ALAT table
  id_proizvodjac?: string | null;  // Updated to match 'id_proizvodjac' in ALAT table
  id_kategorija?: string | null;   // Updated to match 'id_kategorija' in ALAT table
  id_tip_izdavanja?: string | null; // Updated to match 'id_tip_izdavanja' in ALAT table
  id_status?: string | null;       // Updated to match 'id_status' in ALAT table
  vrijednost?: string | null;      // Updated to match 'vrijednost' in ALAT table
  id_kistra?: string | null;       // Updated to match 'id_kistra' in ALAT table
  garancija_u_godinama?: number | null;        // Updated to match 'id_nalog' in ALAT table
  id_uposlenik: string;
  selectedMenu: string | null;
  
}
