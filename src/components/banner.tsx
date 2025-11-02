import banner_url from '@assets/banner.webp';
import './banner.css'

export function Banner() {
    return (
        <div id='banner'>
            <img src={banner_url} />
        </div>
    );
}
