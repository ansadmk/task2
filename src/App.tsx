import { useEffect, useState } from "react";
import axios from "axios";

const YourComponent = () => {
  const [addcount, setAddCount] = useState(0);
  const [updateCount, setUpdateCount] = useState(0);
  const [datas, setDatas] = useState([]);
  const [render, setRender] = useState(0);
  const [isUpdate, setisUpdate] = useState({ is: false, id: "" });

  const handleAdd = async (e: any) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/api/add", {
      data: e.target.data.value,
    });
    setRender(render + 1);
    e.target.reset();
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();
  if (isUpdate.is) {
    
    await axios.post(`http://localhost:8080/api/edit/${isUpdate.id}`, {
      data: e.target.update.value,
    });
    setRender(render + 1);
    setisUpdate({ is: false, id: "" })
  }

  };
  useEffect(() => {
    async function handledatas() {
      const res = await axios.get("http://localhost:8080/api/datas");
      setDatas(res.data.data);
      setAddCount(res.data.calls.add);
      setUpdateCount(res.data.calls.update);
    }
    handledatas();
  }, [render]);

  return (
    <div>
      <form action="" onSubmit={handleAdd}>
        <input type="text" id="data" />
        <button>Add</button>
      </form>
      <ul style={{width:'100vh'}} >
        UpdateCount: {updateCount} <br />
        AddCount: {addcount}
        {datas
          ? datas.map((items: any) => (
              <li style={{padding:"10px",display:'flex',justifyContent:"space-between",width:'100vh'}} key={items._id}>
                <form action="" onSubmit={handleUpdate}>
                  {isUpdate.is && isUpdate.id == items._id ? (
                    <input type="text" id="update" />
                  ) : (
                    items.data
                  )}
                  {isUpdate.is && isUpdate.id == items._id ? (
                   null
                  ) : (
                    <button
                      
                      onClick={() => setisUpdate({ is: true, id: items._id })}
                    >
                      Update
                    </button>
                  )}
                </form>
              </li>
            ))
          : null}
      </ul>
      {/* <button onClick={handleCount}>Count</button> */}
    </div>
  );
};

export default YourComponent;
