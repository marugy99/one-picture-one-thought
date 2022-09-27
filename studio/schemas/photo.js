export default {
  name: "photo",
  type: "document",
  title: "Photo",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
    },
    {
      name: "thought",
      type: "text",
      title: "Thought",
    },
    {
      name: "photo",
      title: "Photo",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
        },
      ],
    },
  ],
};
