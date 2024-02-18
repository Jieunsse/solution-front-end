import main from '../../../public/main.svg';
import volunteers from '../../../public/volunteer.svg';

const home = () => {
  return (
    <div className="overflow-y-auto h-full">
      <title className="flex flex-col pl-[22px] w-[278px] pt-10">
        <span className="text-[36px] text-gray-700">I'm Looking For:</span>
        <span className="text-[24px] text-gray-400 ml-auto">
          volunteers service
        </span>
      </title>
      <section className="relative pt-10">
        <img src={main} alt="volunteerLogo" className="relative top-0" />
        <div className="absolute top-[184px] left-[57px] bg-gray-700">
          <img src={volunteers} alt="volunteers" />
        </div>
      </section>
      <section className="flex flex-col text-gray-400 pt-10 items-end pr-3 text-[20px]">
        <span>
          Provide <b className="italic">free activities</b>
        </span>
        <span>of volunteers and </span>
        <span>matching services.</span>
      </section>
    </div>
  );
};

export default home;
