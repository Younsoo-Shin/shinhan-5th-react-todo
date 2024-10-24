/**
 *
 * @param {colorList: Array<string>} 렌더링할 color들의 배열
 * @param {onClickColor: (color)=>void} 각 컬러가 클릭되었을 때 호출될 함수.
 * @returns
 */
export default function Colorbar({ colorList, onClickColor }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        maxWidth: 200,
        margin: 'auto',
      }}
    >
      {colorList.map((color, idx) => (
        <button
          key={idx}
          className="colorpick-btn"
          style={{ backgroundColor: color }}
          onClick={() => {
            onClickColor(color);
            // setPickedColor(color);
          }}
        ></button>
      ))}
    </div>
  );
}
