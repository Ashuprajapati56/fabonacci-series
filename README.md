# fabonacci-series
#include <stdio.h>

int main(){
int t1=0,t2=1,nextterm, n,i;
printf("enter a number");
scanf("%d",&n);

printf("fabona series\n");

for(i=1;i<=n;i++){
printf(" %d ",t1);
nextterm=t1+t2;
t1=t2;
t2= nextterm;}
return 0;
}
