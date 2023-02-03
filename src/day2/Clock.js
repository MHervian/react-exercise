import { useEffect, useState, useRef } from 'react';
import './Clock.css';

// komponen jam
function Jam({ jamBerapa }) {
    return (<div className='jam'>{jamBerapa}</div>);
}

// komponen tombol - tombol timer
function Pengontrol({ onHandleReset, onHandleStartPause, keadaan }) {
    return (
        <>
            <div className='pengontrol'>
                <button onClick={onHandleReset}>Reset</button>
                <button onClick={onHandleStartPause}>{keadaan}</button>
            </div>
        </>
    );
}

// komponen utama timer
export default function Timer() {
    const timer = useRef();                            // buat simpan referensi timer interval

    const [tombol, setTombol] = useState('Start');     // state buat keadaan tombol
    const [waktu, setWaktu] = useState('00:00:00');    // state buat waktu yang ditampilkan
    const [waktuTimer, setWaktuTimer] = useState(0);   // state buat waktu yang ditampilkan

    function handleReset() {
        clearInterval(timer.current);

        setTombol('Start');
        setWaktu('00:00:00');
        setWaktuTimer(0);
    }

    function handleStartPause() {
        // ganti status tombol dan progress aksi keadaan timer
        let ganti = '';
        if (tombol !== 'Pause') {
            timer.current = setInterval(() => {
                setWaktuTimer((waktuTimer) => {
                    return waktuTimer + 1;
                });
            }, 1000);
            ganti = 'Pause';
        } else {
            clearInterval(timer.current);
            ganti = 'Start';
        }
        setTombol(ganti);
    }
    
    useEffect(() => {
        console.log('Re-render');
        let remain = 0;

        // hitung detik
        let detik = (waktuTimer % 60)? waktuTimer % 60 : 0;
        
        // hitung menit
        remain = Math.floor(waktuTimer / 60);
        let menit = (remain % 60)? remain % 60 : 0;
        
        // hitung jam
        remain = Math.floor(menit / 60);
        let jam = (remain % 24)? remain % 24 : 0;
        
        // konversi
        detik = (detik < 10)? `0${detik}` : detik;
        menit = (menit < 10)? `0${menit}` : menit;
        jam = (jam < 10)? `0${jam}` : jam;
        setWaktu(`${jam}:${menit}:${detik}`);
    }, [waktuTimer]);

    useEffect(() => console.log('Start Initial'), []);

    return (
        <>
            <div className='timer'>
                {/* <Jam timer={waktuTimer} /> */}
                <Jam jamBerapa={waktu} />
                <Pengontrol
                    onHandleReset={handleReset}
                    onHandleStartPause={handleStartPause}
                    keadaan={tombol}
                />
            </div>
        </>
    );
}