import './Header.css';

export const Header = () => (
    <div className="row justify-content__space_between header"> 
        <div className="column margin-left-20">
            <span> Interview questions </span>
        </div>
        <div className="column margin-right-20">
            <a href={"/"}> Home </a>
        </div>
    </div>
)