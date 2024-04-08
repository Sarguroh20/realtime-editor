import React, {useEffect, useRef} from 'react';
import lottie from 'lottie-web';
import { useNavigate } from 'react-router-dom';

const Main = () => {
    const container = useRef(null);
    useEffect(() => {
        lottie.loadAnimation({
            container: container.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('./Animation - 1711999006454.json')
        })
    }, [])

    const navigate = useNavigate()

  return (
    <div>
        <img src="Logo.png" alt="Logo" className='main_logo'/>
        <div className="header">
            <div className="header_text">
                <h1>INTRODUCING: <span>SynCode</span></h1>
                <p>Revolutionize teamwork with SynCode, a real-time web based code editor like Google Docs for projects.
                    Empower multiple developers to collaborate seamlessly on the same codebase, fostering instant feedback & unparalleled efficiency.
                </p>
                <button onClick={() => navigate('/home')} className='btn trybtn'>Let's try SynCode</button>
            </div>
            <div className="header_img">
                <div className="container" ref={container}></div>
            </div>
        </div>
    </div>
  );
}

export default Main
