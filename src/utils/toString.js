function toText(content) {
	if (content) {
		switch (typeof content) {
			case 'object':
				return content.token.join(',  ');
			case 'string':
				return content;
			default:
				break;
		}
	}
}

export { toText };
