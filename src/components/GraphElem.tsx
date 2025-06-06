function GraphElem() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='flex items-center flex-col relative'>
        <button
          type='button'
          className='w-16 h-16 border-2 border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-colors opacity-80 rounded-full flex justify-center items-center z-10'
        />

        <div className='absolute bottom-[3.9rem] left-10 w-8 h-0.5 bg-white dark:bg-gray-900 border border-gray-200 transform -rotate-45 origin-top-left' />

        <div className='flex gap-8 mt-4'>
          {/* Nodo 2 */}
          <button
            type='button'
            className='w-16 h-16 border-2 border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-colors opacity-80 rounded-full flex justify-center items-center z-10'
          />

          {/* Nodo 3 */}
          <button
            type='button'
            className='w-16 h-16 border-2 border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-colors opacity-80 rounded-full flex justify-center items-center z-10'
          />
        </div>

        {/* Arco tra nodo 1 e nodo 3 */}
        <div className='absolute bottom-[3.9rem] right-10 w-0.5 h-8 bg-black border border-gray-200 transform -rotate-45 origin-bottom-right' />
      </div>
    </div>
  );
}

export default GraphElem;
