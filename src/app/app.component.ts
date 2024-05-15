import { NgFor, NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TreeNode } from 'primeng/api/treenode';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TreeTable, TreeTableModule } from 'primeng/treetable';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, NgIf, TreeTableModule, SelectButtonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  @ViewChild('tt') tt: TreeTable | undefined;

  title = `Karaoke The Car's`;
  //csvUrl = './assets/files/song-list.csv';
  spanishSongs = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6ZGLb5c1-fYWhcVaFuQ_7HRJ6JF132NYylDo8JOD-p6mG_oDa2Y1vnyZW_6o4taEQeBTMCMqJKvJQ/pub?gid=730419&single=true&output=tsv';
  englishSongs = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6ZGLb5c1-fYWhcVaFuQ_7HRJ6JF132NYylDo8JOD-p6mG_oDa2Y1vnyZW_6o4taEQeBTMCMqJKvJQ/pub?gid=2137679682&single=true&output=tsv';
  
  cols!: Column[];
  tableData: TreeNode[] = [];
  artists: string[] = [];
  filterMode = 'lenient';
  
  valid: boolean = false;
  isLoading: boolean = true;

  language: string = 'es';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cols = [{ field: 'name', header: 'Canciones' }];

    this.readCsvData(this.spanishSongs);
  }

  resetData() {
    this.tableData = [];
    this.artists = [];
    this.valid = false;
    this.isLoading = true;
  }

  manageLanguage(language: string) {
    if(this.language !== language) {
      this.language = language;
    }

    this.resetData();
    if(this.language === 'es') {
      console.log("spanish songs");
      this.readCsvData(this.spanishSongs);
    } else {
      console.log("english songs");
      this.readCsvData(this.englishSongs);
    }
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.tt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  readCsvData(songList: string) {
    this.http.get(songList, { responseType: 'text' }).subscribe({
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
      var artistElem = line.split('\t')[0];
      //artistElem = artistElem.substring(1); // removing first double quotes
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

    //console.log(this.tableData);
    this.valid = true;
    this.isLoading = false;
  }

  getArtistSongs(data: string, artist: string): string[] {
    var songList: string[] = [];
    for (const line of data.split(/[\r\n]+/)) {
      let elem = line.split('\t')[0];
      let artistElem = elem; //.substring(1); // removing first double quotes
      if (artist === artistElem) {
        var songElem = line.split('\t')[1];
        //songElem = songElem.slice(0, -1);
        songList.push(songElem);
      }
    }
    return songList;
  }

  // Artist and Songs Data Example:
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
