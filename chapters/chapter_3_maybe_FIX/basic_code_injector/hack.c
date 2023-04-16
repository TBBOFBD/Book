#include <stdio.h>

int main(void) {
	const char KEY[] = "LISENCE_KEY";
	printf("Address of c: %p\n", &KEY);
	while(1) {
		printf("Enter the key: ");
		char input[100];
		scanf("%s", input);
		if (strcmp(input, KEY) == 0) {
			printf("Correct key!\n");
			break;
		} else {
			printf("Wrong key!\n");
		}
	}

	return 0;
}