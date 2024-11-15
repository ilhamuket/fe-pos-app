import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface SliderSectionProps {
  theme: 'dark' | 'light';
}

const SliderSection: React.FC<SliderSectionProps> = ({ theme }) => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    appendDots: (dots: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined) => (
      <div>
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: () => (
      <div className="slick-dot">
        <button className="btn btn-circle btn-xs bg-gray-300 hover:bg-gray-500"></button>
      </div>
    )
  };


  return (
    <div className={`hidden md:flex md:w-1/2 ${theme === 'dark' ? 'bg-blue-700' : 'bg-blue-600'} text-white p-8 flex-col justify-between`}>
      <div className="mb-8">
        <Slider {...settings}>
          <div>
            <p className="italic">“Fleksibel diintegrasikan dengan sistem, alur pencatatannya mudah dipahami serta free biaya implementasi dan konsultasi. Kledo Keren!”</p>
            <div className="flex items-center mt-6">
              <img
                src="https://via.placeholder.com/40"
                alt="Author"
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <h4 className="font-bold">Wahyu Ekorini</h4>
                <p className="text-sm">Direktur Operasional PT. JC Indonesia</p>
              </div>
            </div>
          </div>
          <div>
            <p className="italic">“Dummy text 1 for carousel. This is a placeholder text.”</p>
            <div className="flex items-center mt-6">
              <img
                src="https://via.placeholder.com/40"
                alt="Author"
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <h4 className="font-bold">John Doe</h4>
                <p className="text-sm">CEO of Dummy Corp</p>
              </div>
            </div>
          </div>
          <div>
            <p className="italic">“Dummy text 2 for carousel. This is another placeholder text.”</p>
            <div className="flex items-center mt-6">
              <img
                src="https://via.placeholder.com/40"
                alt="Author"
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <h4 className="font-bold">Jane Smith</h4>
                <p className="text-sm">CTO of Example Inc</p>
              </div>
            </div>
          </div>
        </Slider>
      </div>
      <h1 className="text-4xl font-bold text-center md:text-left">POS</h1>
    </div>
  );
};

export default SliderSection;