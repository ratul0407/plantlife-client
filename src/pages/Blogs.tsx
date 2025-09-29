const Blogs = () => {
  return (
    <div>
      <h1 className="font-roboto flex items-center justify-center py-30 text-4xl font-bold">
        Blogs page is coming soon
      </h1>
      <div className="container flex">
        <div className="left sticky top-0 h-screen w-1/2 bg-blue-500">
          <h1 className="p-8 text-4xl text-white">Sticky Side</h1>
        </div>

        <div className="right w-1/2 bg-gray-100">
          <div className="space-y-12 p-8">
            <p>Content block 1</p>
            <p>Content block 2</p>
            <p>Content block 3</p>
            <p>Content block 4</p>
            <p>Content block 5</p>
            <p>Content block 6</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
