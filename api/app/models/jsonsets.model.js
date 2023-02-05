module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            title: { type: String, required: true, unique: true },
            operating_system_os: { type: String, enum: ['Win','macOS','Linux']},
            description: { type: String, required: true },
            data: { type: Object, required: true },
            published: Boolean
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Jsonsets = mongoose.model("jsonsets", schema);
    return Jsonsets;
};