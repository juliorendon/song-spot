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
  euskeraSongs = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6ZGLb5c1-fYWhcVaFuQ_7HRJ6JF132NYylDo8JOD-p6mG_oDa2Y1vnyZW_6o4taEQeBTMCMqJKvJQ/pub?gid=590437772&single=true&output=tsv';
  germanSongs = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6ZGLb5c1-fYWhcVaFuQ_7HRJ6JF132NYylDo8JOD-p6mG_oDa2Y1vnyZW_6o4taEQeBTMCMqJKvJQ/pub?gid=271881415&single=true&output=tsv';
  italianSongs = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6ZGLb5c1-fYWhcVaFuQ_7HRJ6JF132NYylDo8JOD-p6mG_oDa2Y1vnyZW_6o4taEQeBTMCMqJKvJQ/pub?gid=903529757&single=true&output=tsv';
  frenchSongs = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6ZGLb5c1-fYWhcVaFuQ_7HRJ6JF132NYylDo8JOD-p6mG_oDa2Y1vnyZW_6o4taEQeBTMCMqJKvJQ/pub?gid=1501217040&single=true&output=tsv';
  otherSongs = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6ZGLb5c1-fYWhcVaFuQ_7HRJ6JF132NYylDo8JOD-p6mG_oDa2Y1vnyZW_6o4taEQeBTMCMqJKvJQ/pub?gid=913092974&single=true&output=tsv';

  bannerImage = '/assets/imgs/banner0.jpg';

  cols!: Column[];
  tableData: TreeNode[] = [];
  artists: string[] = [];
  filterMode = 'lenient';
  
  valid: boolean = false;
  isLoading: boolean = true;

  SPANISH_SONGS = 'Canciones en Español';
  ENGLISH_SONGS = 'Canciones en Inglés';
  GERMAN_SONGS = 'Canciones en Alemán';
  ITALIAN_SONGS = 'Canciones en Italiano';
  FRENCH_SONGS = 'Canciones en Francés';
  EUSKERA_SONGS = 'Canciones en Euskera';
  OTHER_SONGS = 'Canciones en Otros Idiomas';

  language: string = 'es';
  languageMessage: string = this.SPANISH_SONGS;

  // Messages
  songNotFoundMessage = '';
  SONG_NOT_FOUND_ES = 'La canción que buscas aún no la tenemos😱, comentamélo y la agregamos a la lista 😎';
  SONG_NOT_FOUND_EN = `We don't have the song you're looking for yet😱, please tell me and I'll add it to the list 😎`;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cols = [{ field: 'name', header: 'Canciones' }];
    this.readCsvData(this.spanishSongs);
    this.bannerImage = `/assets/imgs/banner${this.getRandomNumber(4)}.jpg`;
    this.songNotFoundMessage = this.SONG_NOT_FOUND_ES;
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
    if (this.language === 'es') {
      console.log('spanish songs');
      this.languageMessage = this.SPANISH_SONGS;
      this.readCsvData(this.spanishSongs);
      this.songNotFoundMessage = this.SONG_NOT_FOUND_ES;
    } else if (this.language === 'en') {
      console.log('english songs');
      this.languageMessage = this.ENGLISH_SONGS;
      this.readCsvData(this.englishSongs);
      this.songNotFoundMessage = this.SONG_NOT_FOUND_EN;
    } else if (this.language === 'eu') {
      console.log('euskera songs');
      this.languageMessage = this.EUSKERA_SONGS;
      this.readCsvData(this.euskeraSongs);
      this.songNotFoundMessage = this.SONG_NOT_FOUND_ES;
    } else if (this.language === 'de') {
      console.log('german songs');
      this.languageMessage = this.GERMAN_SONGS;
      this.readCsvData(this.germanSongs);
      this.songNotFoundMessage = this.SONG_NOT_FOUND_EN;
    } else if (this.language === 'it') {
      console.log('italian songs');
      this.languageMessage = this.ITALIAN_SONGS;
      this.readCsvData(this.italianSongs);
      this.songNotFoundMessage = this.SONG_NOT_FOUND_EN;
    } else if (this.language === 'fr') {
      console.log('french songs');
      this.languageMessage = this.FRENCH_SONGS;
      this.readCsvData(this.frenchSongs);
      this.songNotFoundMessage = this.SONG_NOT_FOUND_EN;
    } else {
      console.log('other language songs');
      this.languageMessage = this.OTHER_SONGS;
      this.readCsvData(this.otherSongs);
      this.songNotFoundMessage = this.SONG_NOT_FOUND_EN;
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

  // Returns random number between 0 and limit-1
  getRandomNumber(limit: number) {
    return Math.floor(Math.random() * limit);
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
