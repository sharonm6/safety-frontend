const HeatMap = ({}) => {
    const fetchData = () => {
      fetch("http://127.0.0.1:5000/map/heatmap?user_id=55799", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
        });
    };
    fetchData();
  
    return (
      <div>
        <p>HeatMap</p>
      </div>
    );
  };
  
export default HeatMap;