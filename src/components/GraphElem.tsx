// The nodes stay pointer-events: none (inherited from the container) so the hero
// content they drift over keeps its own hover. Their hover state is set from
// BgGraph instead; `.graph-node` styles it in globals.css.
const NODE =
  'graph-node w-16 h-16 border-2 border-gray-300 opacity-80 rounded-full z-10';
const EDGE =
  'absolute bottom-[3.9rem] bg-gray-900 dark:bg-white border border-gray-200 transform -rotate-45';

function GraphElem() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='flex items-center flex-col relative'>
        {/* Nodo 1 */}
        <div className={NODE} />

        {/* Arco tra nodo 1 e nodo 2 */}
        <div className={`${EDGE} left-10 w-8 h-0.5 origin-top-left`} />

        <div className='flex gap-8 mt-4'>
          {/* Nodo 2 */}
          <div className={NODE} />

          {/* Nodo 3 */}
          <div className={NODE} />
        </div>

        {/* Arco tra nodo 1 e nodo 3 */}
        <div className={`${EDGE} right-10 w-0.5 h-8 origin-bottom-right`} />
      </div>
    </div>
  );
}

export default GraphElem;
