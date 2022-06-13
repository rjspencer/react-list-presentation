function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

function getHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
  ) - 60;
}

type Props = {
  active?: boolean
}

export const Slides = (props: Props) => {
  return (
    <div style={{ display: props.active ? 'block' : 'none' }}>
      <iframe
        title="Google Slides"
        src="https://docs.google.com/presentation/d/e/2PACX-1vR-6y-x8UVcTQmS5xDdey8fuxGDDtEKpjhByBObsDkCUaVVRA8opCa1C68M1iEP58zBBtV1RF78ZADe/embed?start=false&loop=false&delayms=3000"
        frameBorder="0"
        width={getWidth()}
        height={getHeight()}
        allowFullScreen
      ></iframe>
    </div>
  )
}