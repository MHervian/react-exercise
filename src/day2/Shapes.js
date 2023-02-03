import './Shapes.css';

export default function Shapes() {
    return (
        <>
            <div className='column-3'>
                <div className='col-1'>
                    <div className='kotak'></div>
                    <div className='rounded-kotak'></div>
                </div>
                <div className='col-1'>
                    <div className='segitiga'></div>
                    <div className='lingkaran'></div>
                </div>
                <div className='col-1'>
                    <div className='rounded-kotak-1'></div>
                </div>
            </div>
            <div className='full-column'>
                <div className='persegi-panjang'></div>
            </div>
        </>
    );
}