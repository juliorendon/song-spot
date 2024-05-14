import { NgFor, NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TreeNode } from 'primeng/api/treenode';
import { TreeTable, TreeTableModule } from 'primeng/treetable';
import { HttpClient } from '@angular/common/http';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';

interface Column {
  field: string;
  header: string;
}
interface Artist {
  data: { name: string };
  children: [{ data: { name: string } }];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, NgIf, TreeTableModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = `Karaoke The Car's`;
  csvUrl = 'assets/files/song-list.csv';
  cols!: Column[];
  tableData: TreeNode[] = [];
  artists: string[] = [];
  csvRecords: any;
  filterMode = 'lenient';

  valid: boolean = false;
  isLoading: boolean = true;

  @ViewChild('tt') tt: TreeTable | undefined;

  constructor(private http: HttpClient, private ngxCsvParser: NgxCsvParser) {}

  ngOnInit() {
    this.cols = [{ field: 'name', header: 'Canciones' }];

    this.readCsvData();

    /*
    this.tableData = [
      {
        data: {
          name: 'Aerosmith',
        },
        children: [
          {
            data: {
              name: 'Amazing',
            },
          },
          {
            data: {
              name: 'Living on the Edge',
            },
          },
        ],
      },
      {
        data: {
          name: 'Metallica',
        },
        children: [
          {
            data: {
              name: 'Nothing Else Matters',
            },
          },
          {
            data: {
              name: 'Unforgiven',
            },
          },
        ],
      },
      {
        data: {
          name: 'Queen',
        },
        children: [
          {
            data: {
              name: 'I want to break free',
            },
          },
          {
            data: {
              name: 'We are the champions',
            },
          },
        ],
      },
    ];*/
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.tt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  readCsvData() {
    this.http.get(this.csvUrl, { responseType: 'text' }).subscribe({
      next: (data) => {
        //console.log(data);
        this.getArtistList(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getArtistList(data: string) {
    for (const line of data.split(/[\r\n]+/)) {
      //console.log(line);
      let artistElem = line.split('","')[0];
      artistElem = artistElem.substring(1); // removing first double quotes
      if (artistElem && this.artists.indexOf(artistElem) === -1) {
        this.artists.push(artistElem);
      }
    }
    this.artists = this.artists.sort();
    //console.log(this.artists);

    //console.log(this.getArtistSongs(data, 'Queen').sort());

    for (const artist of this.artists) {
      var artistData: any = {};
      artistData.data = { name: artist };
      artistData.children = [];

      var songs = this.getArtistSongs(data, artist).sort();
      for (const song of songs) {
        artistData.children.push({ data: { name: song } });
      }

      this.tableData.push(artistData);
    }

    console.log(this.tableData);
    this.valid = true;
    this.isLoading = false;
  }

  getArtistSongs(data: string, artist: string): string[] {
    var songList: string[] = [];
    for (const line of data.split(/[\r\n]+/)) {
      let elem = line.split('","')[0];
      let artistElem = elem.substring(1); // removing first double quotes
      if (artist === artistElem) {
        var songElem = line.split('","')[1];
        songElem = songElem.slice(0, -1);
        songList.push(songElem);
      }
    }
    return songList;
  }

  /*
  readCsvData2() {
    this.http.get(this.csvUrl, { responseType: 'text' }).subscribe({
      next: (data) => {
        
        var blob = new Blob([data], {type: 'text/csv'});
        var file = new File([blob], "foo.txt", {type: "text/csv"});
        console.log(file);
        this.ngxCsvParser.parse(file, { header: true, delimiter: ',', encoding: 'utf8' })
        .pipe().subscribe({
        next: (result): void => {
          console.log('Result', result);
          this.csvRecords = result;
        },
        error: (error: NgxCSVParserError): void => {
          console.log('Error', error);
        }
      });

      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  */
}
