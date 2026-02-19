import { useNavigate } from "react-router-dom";
import { IMAGES } from "../../constants/images";

export default function MyOmamoriSection() {
    const navigate = useNavigate();

    // // 오마모리 수 관리 
    // const [omamoris, setOmamoris] = useState([]);

    return (
        <>
            {/* 제작 이미지 */}
            <div>
                <img src={IMAGES.grayOmamori} 
                onClick={() => navigate("/omamori/create")}
                alt="오마모리 생성"
                style={{ cursor: "pointer" }}/>
            </div>

            <div>
                {/* {omamoris.length === 0 ? (
                    <p>아직 만든 오마모리가 없습니다. 오마모리를 생성해보세요!</p>
                ) : (
                    <div>
                        { omamoris.map(...) }
                    </div>
                /)}  */}
            </div>
        </>
    );
}