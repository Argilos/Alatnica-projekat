// unesi-novi-alat.ts
import { Component } from '@angular/core';
import { ToolService } from '../tools/tool.service';
import { Tool } from '../tools/tool.model';

@Component({
  selector: 'app-licna-karta',
  templateUrl: './unesi-novi-alat.html',
  styleUrls: ['./unesi-novi-alat.css'],
})
export class LicnaKartaComponent {
  tool: Tool = {
    alat_id: '',
    bar_kod: '',
    ets_id: '',
    naziv: '',
    datum_ulaza: null,
    id_model: '',
    id_proizvodjac: null, // Change to null or an appropriate numeric default value
    id_kategorija: null,     // Change to null or an appropriate numeric default value
    id_tip_izdavanja: null,  // Change to null or an appropriate numeric default value
    id_status: null,       // Change to null or an appropriate numeric default value
    vrijednost: null,        // Change to null or an appropriate numeric default value
    garancija_u_godinama: null,
    id_uposlenik: '',  
    selectedMenu: null,   // Change to null or an appropriate numeric default value
  };

  constructor(private toolService: ToolService) {}

  onSubmit() {
    console.log('Alat prije spašavanja', this.tool);

    // Assuming you have a method in your toolService to add the tool to the backend
    this.toolService.addTool(this.tool).subscribe(
      (response) => {
        console.log('Alat spašen:', response);

        // Reset the form or perform other actions
        this.tool = {
          alat_id: '',
          bar_kod: '',
          ets_id: '',
          naziv: '',
          datum_ulaza: null,
          id_model: '',
          id_proizvodjac: null, // Change to null or an appropriate numeric default value
          id_kategorija: null,     // Change to null or an appropriate numeric default value
          id_tip_izdavanja: null,  // Change to null or an appropriate numeric default value
          id_status: null,       // Change to null or an appropriate numeric default value
          vrijednost: null,        // Change to null or an appropriate numeric default value
          garancija_u_godinama: null,     // Change to null or an appropriate numeric default value
          id_uposlenik: '',
          selectedMenu: null,
        };
      },
      (error) => {
        console.error('Greška prilikom spašavanja alata:', error);
        // Handle errors (e.g., show an error message)
      }
    );
  }
}
