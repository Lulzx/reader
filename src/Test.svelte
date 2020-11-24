<script lang="ts">
  let pressed: string = "";
  let position: number = 0; // current page
  let count: number = 0; // max pages read
  let json_data = {
    count: 0,
    position: 0,
  };
  let data: string | null = localStorage.getItem("data");
  if (data == null) {
    json_data = {
      count: 0,
      position: 0,
    };
  } else {
    json_data = JSON.parse(data);
  }
  function key_handler(event: any) {
    if (event.code == "ArrowLeft") {
      pressed = "left";
      position -= 1;
    }
    if (event.code == "ArrowRight") {
      pressed = "right";
      position += 1;
    }
    if (event.code == "ArrowLeft" || event.code == "ArrowRight") {
      if (position > count) {
        count = position;
      }
      json_data = { count: count, position: position };
      localStorage.setItem("data", JSON.stringify(json_data));
    }
  }
  position = json_data.position;
  console.log(position);
  count = json_data.count;
  console.log(count);
</script>

<svelte:window on:keydown={key_handler} />
<span class="text-xl">key:
  {pressed}
  - position:
  {position}
  - count:
  {count}</span>
