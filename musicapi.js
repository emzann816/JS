class Music {
    constructor(title, singer, img, file){
        this.title = title;
        this.singer = singer;
        this.img = img;
        this.file = file;
    }

    getName() {
        return this.title;
    }
}


const musicList = [
    new Music("When We Were Young","Adele","Adele_1.jpg", "Adele - When We Were Young Lyrics by JPMUSIC.mp3"),
    new Music("All of Me","John Legend","john-legend.avif", "John Legend - All of Me (Lyrics).mp3"),
    new Music("All I Ask","Adele","Adele_1.jpg", "Adele - All I ask (Lyrics).mp3"),
    new Music("Always Remember Us This Way","Lady Gaga","lady-gaga.jpg", "Lady Gaga - Always Remember Us This Way ( Lyrics Video ).mp3"),
    new Music("When I Look at You","Miley Cyrus","miley.webp", "When I Look at You Lyrics-Miley Cyrus.mp3")
];
