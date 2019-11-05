class Circle {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.chords = [];
    }

    show() {
        this.drawCircle();
        for (var i = 0; i < this.chords.length; i++)
        {
            this.drawChord(this.chords[i]);
        }
        
    }

    drawCircle() {
        fill("white");
        stroke('rgba(0, 0, 0, 1');
        strokeWeight(2);
        ellipse(circle.x, circle.y, circle.r * 2, circle.r * 2);
    }

    drawChord(chord) {
        strokeWeight(1);
        line(chord.x1, chord.y1, chord.x2, chord.y2);
        stroke('rgba(0, 0, 0, .2)');
    }

    newChord() {
        if (this.chords.length < 10000)
        {
            let chord = {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 0,
            }
            const width = window.innerWidth / 2;
            const height = (window.innerHeight - 60) / 2;
            var angle = Math.random()*Math.PI*2;
            chord.x1 = Math.cos(angle)*this.r + width;
            chord.y1 = Math.sin(angle)*this.r + height;
            angle = Math.random()*Math.PI*2;
            chord.x2 = Math.cos(angle)*this.r + width;
            chord.y2 = Math.sin(angle)*this.r + height;

            this.chords.push(chord);
        }
    }
}