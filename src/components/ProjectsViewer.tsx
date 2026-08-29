'use client';

import {
  type FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import 'swiper/css';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Fade } from 'react-awesome-reveal';
import {
  FaBackward,
  FaExternalLinkAlt,
  FaForward,
  FaGithub,
  FaGraduationCap,
} from 'react-icons/fa';
import { Mousewheel } from 'swiper/modules';
import { Swiper, type SwiperRef, SwiperSlide } from 'swiper/react';
import Typewriter, { type TypewriterClass } from 'typewriter-effect';
import iPhoneImg from '@/assets/misc/iphone.webp';
import { type ProjectStatus, projectsInfo } from '@/config/projects';
import Button from './Button';

interface ProjectsViewerProps {
  builtWithStr: string;
  openStr: string;
}

const statusBadgeClass: Record<ProjectStatus, string> = {
  live: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300',
  inDevelopment:
    'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
  archived: 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
};

const ProjectsViewer: FC<ProjectsViewerProps> = ({ builtWithStr, openStr }) => {
  const t = useTranslations('projects');
  const tMeta = useTranslations('projectMeta');

  const projects = useMemo(
    () =>
      projectsInfo.map(({ id, ...rest }) => ({
        id,
        title: t(`${id}.title`),
        description: t.rich(`${id}.description`, {
          strong: (children) => <strong>{children}</strong>,
          em: (children) => <em>{children}</em>,
        }),
        ...rest,
      })),
    [t],
  );

  const [curProject, setCurProject] = useState(projects[0]);

  const isFirst = useMemo(
    () => curProject.id === projects[0].id,
    [curProject, projects],
  );
  const isLast = useMemo(
    () => curProject.id === projects[projects.length - 1].id,
    [curProject, projects],
  );

  const [typewriter, setTypewriter] = useState<TypewriterClass | null>(null);

  useEffect(() => {
    if (!typewriter) return;

    // typewriter.typeString(curProject.name).start();
    typewriter
      // .pauseFor(1000)
      .deleteAll()
      .typeString(curProject.title)
      .start();
  }, [typewriter, curProject]);

  const [showUnavailableModal, setShowUnavailableModal] = useState(false);

  const sliderRef = useRef<SwiperRef>(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      <div className='select-none flex items-center justify-center gap-4'>
        <Button
          color='blue'
          className='rounded-full p-4 ml-auto'
          onClick={handlePrev}
          disabled={isFirst}
        >
          <FaBackward />
        </Button>

        <div className='-mx-6 md:-mx-2 my-6 flex justify-center pt-[1.15rem] pb-10 px-[2.6rem] w-60 h-96 relative'>
          <Image
            width={240}
            height={384}
            loading='lazy'
            placeholder='blur'
            src={iPhoneImg}
            alt='iPhone overlay'
            className='z-20 absolute top-0 bottom-0 right-0 left-0'
          />

          <Swiper
            modules={[Mousewheel]}
            mousewheel={{ forceToAxis: true }}
            spaceBetween={0}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            className='h-full w-full z-40 rounded-2xl overflow-hidden'
            ref={sliderRef}
            onSlideChange={(s) => setCurProject(projects[s.activeIndex])}
          >
            {Object.entries(projectsInfo).map(([name, { image }]) => (
              <SwiperSlide key={name} className='h-full w-full z-10'>
                <Image
                  width={240}
                  height={384}
                  loading='lazy'
                  placeholder='blur'
                  src={image}
                  alt={name}
                  className='z-10 w-full h-full object-cover object-top'
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <Button
          color='blue'
          className='rounded-full p-4 mr-auto'
          onClick={handleNext}
          disabled={isLast}
        >
          <FaForward />
        </Button>
      </div>

      <div className='flex flex-col justify-center'>
        <h1 className='text-4xl tracking-tight font-bold text-gray-600 dark:text-gray-50 leading-tight'>
          <Typewriter
            onInit={(typewriter) => {
              setTypewriter(typewriter);
            }}
            options={{ delay: 30, deleteSpeed: 5 }}
          />
        </h1>

        <div className='mt-3 flex flex-wrap items-center justify-center md:justify-start gap-x-2 gap-y-1 text-sm'>
          <span
            className={`rounded-full px-2.5 py-0.5 font-medium ${statusBadgeClass[curProject.status]}`}
          >
            {tMeta(`status.${curProject.status}`)}
          </span>
          <span className='text-gray-500 dark:text-gray-300'>
            {curProject.year}
          </span>
          <span className='text-gray-400 dark:text-gray-500'>·</span>
          <span className='text-gray-500 dark:text-gray-300'>
            {curProject.solo
              ? tMeta('solo')
              : tMeta(`roles.${curProject.roleKey}`)}
          </span>
        </div>

        <Fade>
          <p className='dark:text-gray-400 mt-4 text-lg min-h-22'>
            {curProject.description}
          </p>

          <p className='mt-4 text-gray-500 dark:text-gray-200'>
            {builtWithStr}
          </p>
          <div className='max-w-full flex-wrap overflow-x-hidden flex items-center justify-center md:justify-start gap-2'>
            {/* {curProject.stack.map((e) => ( */}
            {curProject.stack.map((e) => (
              <div
                key={e}
                className='bg-gray-100 dark:bg-gray-600 dark:hover:bg-gray-500 hover:bg-gray-200 transition-colors rounded-full px-3 py-2 text-sm text-gray-600 dark:text-gray-200'
              >
                {e}
              </div>
            ))}
          </div>
        </Fade>

        <div className='mt-8 flex flex-wrap items-center justify-center md:justify-start gap-4'>
          <Button
            href={curProject.github}
            disabled={!curProject.github}
            className='flex items-center rounded-2xl font-medium tracking-tight px-3'
          >
            <FaGithub />
            <span className='ml-2'>GitHub</span>
          </Button>
          {curProject.unavailable ? (
            <Button
              type='button'
              onClick={() => setShowUnavailableModal(true)}
              color='blue'
              className='flex items-center rounded-2xl font-medium tracking-tight px-3'
            >
              <FaExternalLinkAlt />
              <span className='ml-2'>{tMeta('unavailable')}</span>
            </Button>
          ) : (
            <Button
              href={curProject.url}
              disabled={!curProject.url}
              color='blue'
              className='flex items-center rounded-2xl font-medium tracking-tight px-3'
            >
              <FaExternalLinkAlt />
              <span className='ml-2'>{openStr}</span>
            </Button>
          )}
          {curProject.paperUrl && (
            <Button
              href={curProject.paperUrl}
              className='flex items-center rounded-2xl font-medium tracking-tight px-3'
            >
              <FaGraduationCap />
              <span className='ml-2'>{tMeta('paper')}</span>
            </Button>
          )}
        </div>
      </div>

      {showUnavailableModal && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'
          onClick={() => setShowUnavailableModal(false)}
        >
          <div
            className='max-w-md rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-xl'
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className='text-xl font-bold text-gray-700 dark:text-gray-50'>
              {tMeta('unavailableModal.title')}
            </h2>
            <p className='mt-3 text-gray-600 dark:text-gray-300'>
              {tMeta('unavailableModal.body')}
            </p>
            <Button
              type='button'
              onClick={() => setShowUnavailableModal(false)}
              className='mt-6 rounded-2xl font-medium tracking-tight px-3'
            >
              {tMeta('unavailableModal.close')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsViewer;
