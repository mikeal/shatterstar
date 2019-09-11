# Shatterstar

Shatterstar is a set of tools for encoding data into slightly
fancy CSV files.

This library grew out of several small data projects that were
storing data in GitHub using LFS, often processing it new data
regularly w/ GitHub Actions.

In general it is assumed that data will be read in iteratively
into memory, manipulated and written out again. In other words
this work well with data that can fit in memory, and shatterstar
even helps you in keeping the memory usage low, but it is not
intended for use with data that will not fit into memory.
