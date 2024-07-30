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

  asturiasSongs = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6ZGLb5c1-fYWhcVaFuQ_7HRJ6JF132NYylDo8JOD-p6mG_oDa2Y1vnyZW_6o4taEQeBTMCMqJKvJQ/pub?gid=910579196&single=true&output=tsv';
  belgicaSongs = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6ZGLb5c1-fYWhcVaFuQ_7HRJ6JF132NYylDo8JOD-p6mG_oDa2Y1vnyZW_6o4taEQeBTMCMqJKvJQ/pub?gid=41944273&single=true&output=tsv';
  catalanSongs = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6ZGLb5c1-fYWhcVaFuQ_7HRJ6JF132NYylDo8JOD-p6mG_oDa2Y1vnyZW_6o4taEQeBTMCMqJKvJQ/pub?gid=1524047562&single=true&output=tsv';
  chinoSongs = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6ZGLb5c1-fYWhcVaFuQ_7HRJ6JF132NYylDo8JOD-p6mG_oDa2Y1vnyZW_6o4taEQeBTMCMqJKvJQ/pub?gid=2068845876&single=true&output=tsv';
  koreaSongs = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6ZGLb5c1-fYWhcVaFuQ_7HRJ6JF132NYylDo8JOD-p6mG_oDa2Y1vnyZW_6o4taEQeBTMCMqJKvJQ/pub?gid=282641549&single=true&output=tsv';
  finlandiaSongs = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6ZGLb5c1-fYWhcVaFuQ_7HRJ6JF132NYylDo8JOD-p6mG_oDa2Y1vnyZW_6o4taEQeBTMCMqJKvJQ/pub?gid=1597433517&single=true&output=tsv';
  galiciaSongs = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6ZGLb5c1-fYWhcVaFuQ_7HRJ6JF132NYylDo8JOD-p6mG_oDa2Y1vnyZW_6o4taEQeBTMCMqJKvJQ/pub?gid=1307451105&single=true&output=tsv';
  holandaSongs = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6ZGLb5c1-fYWhcVaFuQ_7HRJ6JF132NYylDo8JOD-p6mG_oDa2Y1vnyZW_6o4taEQeBTMCMqJKvJQ/pub?gid=678876614&single=true&output=tsv';
  indiaSongs = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6ZGLb5c1-fYWhcVaFuQ_7HRJ6JF132NYylDo8JOD-p6mG_oDa2Y1vnyZW_6o4taEQeBTMCMqJKvJQ/pub?gid=1350709274&single=true&output=tsv';
  japonSongs = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6ZGLb5c1-fYWhcVaFuQ_7HRJ6JF132NYylDo8JOD-p6mG_oDa2Y1vnyZW_6o4taEQeBTMCMqJKvJQ/pub?gid=1774750703&single=true&output=tsv';
  poloniaSongs = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6ZGLb5c1-fYWhcVaFuQ_7HRJ6JF132NYylDo8JOD-p6mG_oDa2Y1vnyZW_6o4taEQeBTMCMqJKvJQ/pub?gid=342732063&single=true&output=tsv';
  portuguesSongs = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6ZGLb5c1-fYWhcVaFuQ_7HRJ6JF132NYylDo8JOD-p6mG_oDa2Y1vnyZW_6o4taEQeBTMCMqJKvJQ/pub?gid=1855198939&single=true&output=tsv';
  rumaniaSongs = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6ZGLb5c1-fYWhcVaFuQ_7HRJ6JF132NYylDo8JOD-p6mG_oDa2Y1vnyZW_6o4taEQeBTMCMqJKvJQ/pub?gid=2111641107&single=true&output=tsv';
  rusiaSongs = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6ZGLb5c1-fYWhcVaFuQ_7HRJ6JF132NYylDo8JOD-p6mG_oDa2Y1vnyZW_6o4taEQeBTMCMqJKvJQ/pub?gid=55220638&single=true&output=tsv';
  turkeySongs = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6ZGLb5c1-fYWhcVaFuQ_7HRJ6JF132NYylDo8JOD-p6mG_oDa2Y1vnyZW_6o4taEQeBTMCMqJKvJQ/pub?gid=11619473&single=true&output=tsv';
  ukraineSongs = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6ZGLb5c1-fYWhcVaFuQ_7HRJ6JF132NYylDo8JOD-p6mG_oDa2Y1vnyZW_6o4taEQeBTMCMqJKvJQ/pub?gid=2031158690&single=true&output=tsv';

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

  ASTURIAS_SONGS = 'Canciones en Asturiano';
  BELGICA_SONGS = 'Canciones en Belga';
  CHINA_SONGS = 'Canciones en Chino';
  CATALUNYA_SONGS = 'Canciones en Catalán';
  FINLAND_SONGS = 'Canciones en Finlandés';
  GALICIA_SONGS = 'Canciones en Gallego';
  INDIA_SONGS = 'Canciones en Hindú';
  JAPAN_SONGS = 'Canciones en Japonés';
  KOREA_SONGS = 'Canciones en Coreano';
  NETHERLANDS_SONGS = 'Canciones en Holandés';
  POLAND_SONGS = 'Canciones en Polaco';
  PORTUGAL_SONGS = 'Canciones en Portugués';
  RUMANIA_SONGS = 'Canciones en Rumano';
  RUSIA_SONGS = 'Canciones en Ruso';
  TURKEY_SONGS = 'Canciones en Turco';
  UKRAINE_SONGS = 'Canciones en Ucraniano';

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
    } else if (this.language === 'as') {
      console.log('asturias songs');
      this.languageMessage = this.ASTURIAS_SONGS;
      this.readCsvData(this.asturiasSongs);
      this.songNotFoundMessage = this.SONG_NOT_FOUND_ES;
    } else if (this.language === 'be') {
      console.log('belgica songs');
      this.languageMessage = this.BELGICA_SONGS;
      this.readCsvData(this.belgicaSongs);
      this.songNotFoundMessage = this.SONG_NOT_FOUND_EN;
    } else if (this.language === 'ca') {
      console.log('catalan songs');
      this.languageMessage = this.CATALUNYA_SONGS;
      this.readCsvData(this.catalanSongs);
      this.songNotFoundMessage = this.SONG_NOT_FOUND_ES;
    } else if (this.language === 'ch') {
      console.log('china songs');
      this.languageMessage = this.CHINA_SONGS;
      this.readCsvData(this.chinoSongs);
      this.songNotFoundMessage = this.SONG_NOT_FOUND_EN;
    } else if (this.language === 'ko') {
      console.log('korea songs');
      this.languageMessage = this.KOREA_SONGS;
      this.readCsvData(this.koreaSongs);
      this.songNotFoundMessage = this.SONG_NOT_FOUND_EN;
    } else if (this.language === 'fi') {
      console.log('finlandia songs');
      this.languageMessage = this.FINLAND_SONGS;
      this.readCsvData(this.finlandiaSongs);
      this.songNotFoundMessage = this.SONG_NOT_FOUND_EN;
    } else if (this.language === 'ga') {
      console.log('galicia songs');
      this.languageMessage = this.GALICIA_SONGS;
      this.readCsvData(this.galiciaSongs);
      this.songNotFoundMessage = this.SONG_NOT_FOUND_ES;
    } else if (this.language === 'ne') {
      console.log('holanda songs');
      this.languageMessage = this.NETHERLANDS_SONGS;
      this.readCsvData(this.holandaSongs);
      this.songNotFoundMessage = this.SONG_NOT_FOUND_EN;
    } else if (this.language === 'in') {
      console.log('asturias songs');
      this.languageMessage = this.INDIA_SONGS;
      this.readCsvData(this.indiaSongs);
      this.songNotFoundMessage = this.SONG_NOT_FOUND_EN;
    } else if (this.language === 'ja') {
      console.log('japon songs');
      this.languageMessage = this.JAPAN_SONGS;
      this.readCsvData(this.japonSongs);
      this.songNotFoundMessage = this.SONG_NOT_FOUND_EN;
    } else if (this.language === 'pol') {
      console.log('polonia songs');
      this.languageMessage = this.POLAND_SONGS;
      this.readCsvData(this.poloniaSongs);
      this.songNotFoundMessage = this.SONG_NOT_FOUND_EN;
    } else if (this.language === 'por') {
      console.log('portugues songs');
      this.languageMessage = this.PORTUGAL_SONGS;
      this.readCsvData(this.portuguesSongs);
      this.songNotFoundMessage = this.SONG_NOT_FOUND_ES;
    } else if (this.language === 'rum') {
      console.log('rumania songs');
      this.languageMessage = this.RUMANIA_SONGS;
      this.readCsvData(this.rumaniaSongs);
      this.songNotFoundMessage = this.SONG_NOT_FOUND_EN;
    } else if (this.language === 'rus') {
      console.log('rusia songs');
      this.languageMessage = this.RUSIA_SONGS;
      this.readCsvData(this.rusiaSongs);
      this.songNotFoundMessage = this.SONG_NOT_FOUND_EN;
    } else if (this.language === 'tu') {
      console.log('turkey songs');
      this.languageMessage = this.TURKEY_SONGS;
      this.readCsvData(this.turkeySongs);
      this.songNotFoundMessage = this.SONG_NOT_FOUND_EN;
    } else if (this.language === 'ukr') {
      console.log('ukraine songs');
      this.languageMessage = this.UKRAINE_SONGS;
      this.readCsvData(this.ukraineSongs);
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
